import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { stationValidationSchema } from 'validationSchema/stations';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.station
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getStationById();
    case 'PUT':
      return updateStationById();
    case 'DELETE':
      return deleteStationById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStationById() {
    const data = await prisma.station.findFirst(convertQueryToPrismaUtil(req.query, 'station'));
    return res.status(200).json(data);
  }

  async function updateStationById() {
    await stationValidationSchema.validate(req.body);
    const data = await prisma.station.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteStationById() {
    const data = await prisma.station.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
