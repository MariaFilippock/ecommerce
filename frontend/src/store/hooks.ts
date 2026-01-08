import { useDispatch } from 'react-redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { AnyAction } from 'redux';
import type { RootState } from './index';

export const useAppDispatch = () =>
  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();