import { useEffect, useState } from 'react';
import { months } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addQuote } from '../utils/quoteSlice';
const Header = () => {
  const dateObj = new Date();
  const date = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  const [quote, setQuote] = useState(null);
  const dispatch = useDispatch();
  const storeQuote = useSelector((store) => store.quoteSlice.quote);
  const [liveClock, setLiveClock] = useState('XX:XX:XX');
  useEffect(() => {
    const updateTimer = () => {
      const time = new Date().toLocaleTimeString();
      setLiveClock(time);
    };
    const i = setInterval(() => {
      updateTimer();
    }, 1000);
    const getQuote = async () => {
      const data = await fetch('https://favqs.com/api/qotd');
      const json = await data.json();
      dispatch(addQuote(json.quote));
      setQuote(json.quote);
    };
    if (!storeQuote) getQuote();
    return () => {
      clearInterval(i);
    };
  }, []);
  return (
    <div className="bg-purple-300 p-10">
      <div className="flex justify-center gap-10">
        <span className="text-3xl font-semibold">
          {date} {month}, {year}
        </span>
        <span className="text-3xl font-semibold">{liveClock}</span>
      </div>
      <div className="flex flex-col mt-8 bg-purple-200 p-5 text-md">
        <span>{quote?.body || 'Lorem Ipsum Dolor Sit Amet'}</span>
        <span className="self-end">- {quote?.author || 'Anonymous'}</span>
      </div>
    </div>
  );
};

export default Header;
