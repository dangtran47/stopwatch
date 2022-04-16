import isEmpty from 'lodash/isEmpty'

export default ({ items }) => (
  isEmpty(items)
    ? <></>
    :<div className="history">
      <div>Laps</div>
      <ul>
        {items.map(item => <li className="history-item" key={item}>{item}</li>)}
      </ul>
    </div>
)
