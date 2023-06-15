import SpinningCarousel from "./Main/Spinner";
  const mainBackground = {
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/static/img/MainPage2.png"
    })`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const headingStyle = {
    fontFamily: 'Lilita One, cursive',
  };
  const h1Style = {
    ...headingStyle,
    fontSize: '44px',
  };

  const h2Style = {
    ...headingStyle,
    fontSize: '26px',
  };

  const h3Style = {
    ...headingStyle,
    fontSize: '30px',
  };

export default function HomePage() {
  return (
    <div className="h-screen w-full flex flex-col items-center bg-salmon overflow-hidden" style={mainBackground} >
      <h1 className="" style={h1Style}>iDunno</h1>
      <h2 style={h2Style}>Tired of not knowing what to eat?</h2>
      <h3 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600" style={h3Style}>Spin it!</h3>
      <SpinningCarousel />
    </div>
  );
}
