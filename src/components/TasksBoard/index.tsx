'use client';

import useAuth from '@/hooks/useAuth';
import { getTokenPayload } from '@/lib/auth';
import TasksBoardManager from './TaskBoardManager';
import TasksBoardConsultant from './TaskBoardConsultant';

export default function TasksBoard() {
  useAuth();
  const decoded = getTokenPayload();

  if(decoded) {
    if(decoded.userType == "manager") {
      return (
        <TasksBoardManager
          user={decoded.userType}
          id={decoded.id}
        />
      )
    } else {
      return (
        <TasksBoardConsultant 
          user={decoded.userType}
          id={decoded.id}
        />
      )
    }
  } else {
    return <div></div>
  }
}