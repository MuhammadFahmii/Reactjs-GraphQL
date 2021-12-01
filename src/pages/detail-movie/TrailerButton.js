export default function TrailerButton({ path }) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`https://www.youtube.com/watch?v=${path}`}
      className="badge bg-danger"
    >
      Watch Trailers
    </a>
  );
}
