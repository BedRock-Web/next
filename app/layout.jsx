import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@style/global.css";
export const metadata = {
  title: "janina",
  description: "tao jani na",
};
const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Rootlayout;
