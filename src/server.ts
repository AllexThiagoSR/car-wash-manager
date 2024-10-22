import App from "./App";

const main = async () => {
  const app = new App();
  try {
    app.start(process.env.PORT || 3001);
  } catch (error) {
    console.log(error);
  }
}

main();