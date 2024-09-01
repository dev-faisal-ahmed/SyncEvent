import * as service from './services';
import { catchAsync } from '../../middlewares';
import { sendSuccessResponse } from '../../helpers';

export const addEvent = catchAsync(async (req, res) => {
  const response = await service.addEvent(req.body);

  return sendSuccessResponse(res, { message: 'Event created', data: response });
});
