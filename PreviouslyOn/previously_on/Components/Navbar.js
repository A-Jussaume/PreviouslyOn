import Link from "next/link";
import Router from "next/router";

function Navbar({ isLogged, setUser, removeCookie }) {
  function logout() {
    removeCookie("user");
    removeCookie("token");

    const { pathname } = Router;
    if (pathname == "/login") {
      Router.push("/home");
    }
  }

  if (isLogged == false) {
    return (
      <div className="navbar">
        <div id="logo">
          <Link href="/home">Beta Series</Link>
        </div>
        <div className="vertical-align">
          <div>
            <Link href="/home">Accueil</Link>
          </div>
          <div>
            <Link href="/login">Connexion</Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar">
        {" "}
        <div id="logo">
          <Link href="/home">Beta Series</Link>
        </div>
        <div className="vertical-align">
          <div>
            <Link href="/home">Accueil</Link>
          </div>
          <div>
            <Link href="/home">
              <a onClick={logout} href="/home">
                Déconnexion
              </a>
            </Link>
          </div>
          <div>
            <Link href="/my_series">Mes séries</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
