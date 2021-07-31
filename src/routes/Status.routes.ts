import { Router } from 'express';
import DatabaseHealth from '../controllers/DatabaseHealthController';

const Status = Router();

Status.get('/', DatabaseHealth.datahealth);

export default Status;
