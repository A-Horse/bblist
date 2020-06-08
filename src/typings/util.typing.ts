import { AxiosSuccessAction, FSAction } from '../redux/actions/actions';

export type AxiosDispatch = (action: FSAction) => Promise<AxiosSuccessAction>;
