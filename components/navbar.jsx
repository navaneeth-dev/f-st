import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const leftRoutes = [
    {
      href: "/",
      name: "Shortner",
    },
    {
      href: "/text",
      name: "Text",
    },
    {
      href: "/file",
      name: "File Transfer",
      disabled: true,
    },
  ];
  const rightRoutes = [
    {
      href: "/about",
      name: "About",
    },
  ];

  const router = useRouter();
  const { pathname } = router;

  const isActive = (pathName, href) => {
    return pathName === href ? "active" : "";
  };
  const isDisabled = (disabled) => {
    return disabled ? "disabled" : "";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">F-ST</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {leftRoutes.map((route) => (
              <li key={route.href} className="nav-item">
                <Link href={route.href}>
                  <a
                    className={`nav-link ${isActive(
                      pathname,
                      route.href
                    )} ${isDisabled(route.disabled)}`}
                  >
                    {route.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="navbar-nav">
            {rightRoutes.map((route) => (
              <li key={route.href} className="nav-item">
                <Link href={route.href}>
                  <a
                    className={`nav-link ${isActive(
                      pathname,
                      route.href
                    )} ${isDisabled(route.disabled)}`}
                  >
                    {route.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
