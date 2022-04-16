import Duration from './Duration'

export default ({ ms, requestLap, requestStop }) => (
  <section className="counter">
    <h4 className="watch-state running">Running...</h4>
    <Duration ms={ms} />
    <footer>
      <button className="button" onClick={requestStop}>Stop</button>
      <button className="button" onClick={requestLap}>Lap</button>
    </footer>
  </section>
)
