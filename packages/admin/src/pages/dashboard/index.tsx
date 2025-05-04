import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { decrement, increment, incrementByAmount } from '../../store/counterSlice';
function Dashboard() {
  const count = useSelector<RootState, number>(state => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <h1>{count}</h1>
      <Button onClick={() => dispatch(increment())}>Increment</Button>
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      <Button onClick={() => dispatch(incrementByAmount(10))}>Increment by 10</Button>
    </div>
  );
}

export default Dashboard;
