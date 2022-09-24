export function Loading() {
  return (
    <div
      style={{
        position: `absolute`,
        width: `100vw`,
        height: `100vh`,
        backdropFilter: `blur(13px)`,
        flexDirection: `column`,
        color: `black`,
        top: `0`,
        left: `0`,
        textAlign: `center`,
        justifyContent: `center`,
        display: "flex",
      }}
    >
      <h2>Loading...</h2>
    </div>
  );
}
