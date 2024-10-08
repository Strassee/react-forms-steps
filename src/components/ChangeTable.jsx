function ChangeTable({data, handleDel, handleEdit}) {
  let result = [];
  result.push(<tr key='head'>
                  <th>Дата (ДД.ММ.ГГ)</th>
                  <th>Пройдено км</th>
                  <th>Действия</th>
                </tr>);
  for (let date in data) {
    result.push(<tr key={date}>
                  <td>{date}</td>
                  <td>{data[date]}</td>
                  <td><span onClick={(e) => handleEdit(e, date)}>&#9998;</span>&nbsp;&nbsp;<span onClick={(e) => handleDel(e, date)}>&#10007;</span></td>
                </tr>);
  }
  return (
    <table>
      {result}
    </table>
  )
}

export default ChangeTable;