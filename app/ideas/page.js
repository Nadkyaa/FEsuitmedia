
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Header from './components/Header';
import Banner from './components/Banner';
import PostCard from './components/PostCard';
import Pagination from './components/Pagination';

import { fetchIdeas } from '../../lib/api';
import styles from './page.module.css';

function IdeasContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = parseInt(searchParams.get('page')) || 1;
  const initialSize = parseInt(searchParams.get('size')) || 10;
  const initialSort = searchParams.get('sort') || '-published_at';

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialSize);
  const [sortBy, setSortBy] = useState(initialSort);
  const [totalItems, setTotalItems] = useState(0);

  const getPosts = async (page, size, sort) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchIdeas(page, size, sort);
      setPosts(data.data);
      setTotalItems(data.meta.total);
    } catch (err) {
      setError(err.message || 'Failed to load posts. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(initialPage);
    setPageSize(initialSize);
    setSortBy(initialSort);

    getPosts(initialPage, initialSize, initialSort);
  }, [initialPage, initialSize, initialSort]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', currentPage.toString());
    params.set('size', pageSize.toString());
    params.set('sort', sortBy);
    router.push(`/ideas?${params.toString()}`, undefined, { shallow: true });
  }, [currentPage, pageSize, sortBy, router]);

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const showingStart = (currentPage - 1) * pageSize + 1;
  const showingEnd = Math.min(showingStart + pageSize - 1, totalItems);

  return (
    <main className={styles.container}>
      <section className={styles.controls}>
        <div className={styles.showingInfo}>
          Showing <span id="showing-start">{showingStart}</span> - <span id="showing-end">{showingEnd}</span> of <span id="total-items">{totalItems}</span>
        </div>
        <div className={styles.sortOptions}>
          <label htmlFor="show-per-page">Show per page:</label>
          <select id="show-per-page" value={pageSize} onChange={handlePageSizeChange}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>

          <label htmlFor="sort-by">Sort by:</label>
          <select id="sort-by" value={sortBy} onChange={handleSortByChange}>
            <option value="-published_at">Newest</option>
            <option value="published_at">Oldest</option>
          </select>
        </div>
      </section>

      <section className={styles.postList}>
        {loading && <p>Loading posts...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && posts.length === 0 && <p>No posts found.</p>}
        {!loading && !error && posts.length > 0 && (
          posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </section>

      {!loading && !error && totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
}

export default function IdeasPage() {
  return (
    <>
      <Header />
      <Banner />
      <Suspense fallback={<div>Memuat konten halaman...</div>}>
        <IdeasContent />
      </Suspense>
    </>
  );
}