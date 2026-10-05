export function splitTitle(text: string) {
  const lines = text.split('\n')
  return lines.map((line, i) => (
    <span key={`${i}-${line}`}>
      {line}
      {i < lines.length - 1 ? (
        <>
          {' '}
          <br />
        </>
      ) : null}
    </span>
  ))
}
