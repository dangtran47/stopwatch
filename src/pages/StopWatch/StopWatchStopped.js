import Duration from './Duration'

export default ({ ms, requestReset, requestResume }) => (
  <section className="counter">
    <h4 className="watch-state stopped">Stopped</h4>
    <Duration ms={ms} />
    <footer>
      <button className="button" onClick={requestReset}>Reset</button>
      <button className="button" onClick={requestResume}>Resume</button>
    </footer>
  </section>
)
