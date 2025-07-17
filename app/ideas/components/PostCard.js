// app/components/PostCard.js
import Image from 'next/image';
import styles from './PostCard.module.css';

// Definisikan path ke gambar placeholder lokal Anda
const LOCAL_PLACEHOLDER_IMAGE = '/placeholder-image.jpg'; // Path dari folder public/

export default function PostCard({ post }) {
  // Data lain seperti title dan published_at tetap dari 'post' yang datang dari API
  const postDate = new Date(post.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={styles.card}>
      <div className={styles.thumbnailContainer}>
        <Image
          src={LOCAL_PLACEHOLDER_IMAGE} // <-- Gambar akan selalu berasal dari sumber lokal ini
          alt={post.title || 'Gambar Placeholder'} // Menggunakan judul post untuk alt, fallback ke 'Gambar Placeholder'
          fill // Memastikan gambar mengisi kontainer
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.content}>
        <p className={styles.date}>{postDate}</p>
        <h3 className={styles.title}>{post.title}</h3>
      </div>
    </div>
  );
}