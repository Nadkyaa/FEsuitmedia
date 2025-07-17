
import Image from 'next/image';
import styles from './PostCard.module.css';

const LOCAL_PLACEHOLDER_IMAGE = '/placeholder-image.jpg';

export default function PostCard({ post }) {
  const postDate = new Date(post.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={styles.card}>
      <div className={styles.thumbnailContainer}>
        <Image
          src={LOCAL_PLACEHOLDER_IMAGE}
          alt={post.title || 'Gambar Placeholder'}
          fill
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