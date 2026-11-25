import "./App.css";

const profile = {
  name: "Your Name",
  bio: "MSc (Computer Application) student at Abasaheb Garware College, Pune. Interested in full stack development and software testing.",
  image: "/avatar.svg",
  description:
    "I build web applications with React and test them with Selenium WebDriver and TestNG. Replace this text with your own details.",
};

export default function App() {
  return (
    <div className="container center">
      <img src={profile.image} alt={profile.name} width="160" height="160" style={{ borderRadius: "50%" }} />
      <h1>{profile.name}</h1>
      <h3>Short Bio</h3>
      <p>{profile.bio}</p>
      <h3>About My Profile</h3>
      <p>{profile.description}</p>
    </div>
  );
}
