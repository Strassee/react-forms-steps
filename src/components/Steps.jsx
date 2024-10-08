import { useState } from 'react';
import ChangeTable from './ChangeTable';
import moment from 'moment';

function Steps() {
  const reDate = /^(3[01]|[12][0-9]|0[1-9]).(1[0-2]|0[1-9]).[0-9]{2}$/gm;
  const reDistance = /^[-0-9]*\.?[0-9]+$/gm;
  const[stat,setStat]=useState({date: '', distance: ''});
  const[data,setData]=useState({});
  const[result,setResult]=useState('');
  const handleState = (e) => {
    const {name, value} = e.target;
    switch (name) {
      case 'date':
        if (value.length <= 8) {
          setStat((prevForm) => ({...prevForm, [name]: value}));
        }
        break;
      case 'distance':
        setStat((prevForm) => ({...prevForm, [name]: value}));
        break;
        default:
    }
  }

  const handleDel = (e, delDate) => {
    setData((prevData) => {
      return Object.fromEntries(Object.entries({...prevData}).filter(([date]) => date !== delDate));
    });
    setStat({date: '', distance: ''});
    setResult('Данные удалены');
  }

  const handleEdit = (e, editDate) => {
    setStat(() => ({date: editDate, distance: data[editDate]}));
    setData((prevData) => {
      return Object.fromEntries(Object.entries({...prevData}).filter(([date]) => date !== editDate));
    });
    setResult('Данные загружены');
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(reDate.test(stat.date) && reDistance.test(stat.distance)) {
      let distance =  data.hasOwnProperty(stat.date) ? Number(data[stat.date]) + Number(stat.distance) : stat.distance;
      distance = distance > 0 ? distance : 0;
      setData((prevData) => {
        return Object.fromEntries(Object.entries({...prevData, [stat.date]: distance}).sort((a, b) => moment(b[0], 'DD.MM.YY') - moment(a[0], 'DD.MM.YY')));
      });
      setResult('Данные добавлены');
      setStat({date: '', distance: ''});
    } else {
      setResult('Ошибка ввода данных');
      setStat({date: '', distance: ''});
    }
  }
  
  return (
    <div className="">
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <div className="input__box">
            <label className='labelInput' htmlFor="date">Дата (ДД.ММ.ГГ)</label>
            <input className='inputText' type="text" value={stat.date}  id="date" name="date" onInput={handleState} />
          </div>
          <div className="input__box">
            <label className='labelInput' htmlFor="km">Пройдено км</label>
            <input className='inputText' type="text" value={stat.distance} id="distance" name="distance" onInput={handleState} />
          </div>
          <button className='button' type="submit">OK</button>
        </form>
      </div>
      <div className='data'>
        <div className='dataTable'>
          <span className='resultTable'>{result}</span>
          {Object.keys(data).length !== 0? <ChangeTable data={data} handleDel={handleDel} handleEdit={handleEdit} /> : ''}
        </div>
      </div>
    </div>
  )
}

export default Steps;


