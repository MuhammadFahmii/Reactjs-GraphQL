export default function TrailerButton({ path }) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`https://www.youtube.com/watch?v=${path}`}
      className="btn btn-warning mx-3"
    >
      Watch Trailers
    </a>
  );
}
