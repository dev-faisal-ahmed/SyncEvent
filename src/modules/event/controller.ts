import * as service from './services';
import { catchAsync } from '../../middlewares';
import { sendSuccessResponse } from '../../helpers';

export const addEvent = catchAsync(async (req, res) => {
  const response = await service.addEvent(req.body);

  return sendSuccessResponse(res, { message: 'Event created', data: response });
});

export const getEvents = catchAsync(async (req, res) => {
  const response = await service.getEvents(req.query);

  return sendSuccessResponse(res, {
    message: 'Event retrieved successfully',
    meta: response.meta,
    data: response.events,
  });
});

export const getEVentDetails = catchAsync(async (req, res) => {
  const response = await service.getEventDetails(Number(req.params.eventId));

  return sendSuccessResponse(res, {
    message: 'Event details retrieved successfully',
    data: response,
  });
});
