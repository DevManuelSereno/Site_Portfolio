/**
 * Markup da abertura, renderizado no servidor. Fica `display: none` até o
 * script do `<head>` pôr `intro-on` no `<html>` (CSS em `globals.css`), e só
 * cobre a página: o conteúdo real continua no HTML, visível por baixo.
 * Eixos, cota e carimbo são montados no cliente: os eixos dependem do tamanho
 * da tela, e o texto da cota e do carimbo é anotação da abertura, não conteúdo
 * que um extrator de texto deva ler.
 */
export function IntroOverlay() {
  return (
    <>
      <div id="intro" className="intro" aria-hidden="true">
        <div className="intro-grid" />
        <svg className="intro-axes" />
        <div className="intro-ruler intro-ruler-top" />
        <div className="intro-ruler intro-ruler-left" />
        <i className="intro-mark intro-mark-tl" />
        <i className="intro-mark intro-mark-tr" />
        <i className="intro-mark intro-mark-bl" />
        <i className="intro-mark intro-mark-br" />
        <svg className="intro-shapes" viewBox="0 0 120 120" />
      </div>
      <svg id="intro-fly" className="intro-fly" viewBox="0 0 120 120" aria-hidden="true">
        <path d="M60 60" />
      </svg>
    </>
  )
}
