import Duration from './Duration'

export default ({ requestStart }) => (
  <section className="counter">
    <h4 className="watch-state initial">Initial</h4>
    <Duration ms={0} />
    <footer>
      <button className="button" onClick={requestStart}>Start</button>
    </footer>
  </section>
)
