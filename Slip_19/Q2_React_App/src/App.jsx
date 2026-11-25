import "./App.css";

const movies = [
  "The Shawshank Redemption", "The Godfather", "The Dark Knight", "Inception", "Interstellar",
  "Forrest Gump", "The Matrix", "3 Idiots", "Dangal", "Lagaan",
];

function MovieList() {
  return (
    <ol>
      {movies.map((m, i) => <li key={i}>{m}</li>)}
    </ol>
  );
}

export default function App() {
  return (
    <div className="container">
      <h1>My 10 Favorite Movies</h1>
      <MovieList />
    </div>
  );
}
