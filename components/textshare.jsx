const TextShare = ({ long_url }) => {
  return (
    <div className="col-12">
      <div
        className="alert alert-dark d-flex flex-column flex-lg-row justify-content-between align-items-center"
        role="alert"
      >
        <a href={long_url}>{long_url}</a>
        <button className="btn btn-secondary">Copy</button>
      </div>
    </div>
  );
};

export default TextShare;
