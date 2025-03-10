'use client';

import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchHabitsThunk } from "../features/habitSlice";
import Habits from "./habits"

export default function Home() {
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.habits);
  const habitStatus = useSelector((state) => state.habits.loading);

  useEffect(() => {
    if (!habitStatus) {
      dispatch(fetchHabitsThunk());
    }
  }, [dispatch, habitStatus]);

  return (
    <div className="">
      <Habits habits={habits} />
    </div>
  );
}