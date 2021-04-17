const Header = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="d-flex">
        <a href="https://github.com/RizeXor/f-st">F-ST</a>
        &nbsp;
        <span className="badge bg-secondary">
          {process.env.NEXT_PUBLIC_APP_VERSION}
        </span>
      </h2>
      <p className="lead text-center">
        Worlds most trusted open source URL shortner.
      </p>
    </div>
  );
};

export default Header;
