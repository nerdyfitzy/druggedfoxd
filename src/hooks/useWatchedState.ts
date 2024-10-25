import { variablesSchema } from "@/constants/schema";
import { useMutationState } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const useWatchedState = (watched: boolean, lessonId: number) => {
  const [wState, setWState] = useState(watched);
  const variables = useMutationState({
    filters: {
      mutationKey: ["changeWatched", `${lessonId}`],
      status: "pending",
    },
    select: (mutation) => mutation.state.variables,
  });
  useEffect(() => {
    if (variables.length > 0) {
      const parsed = variablesSchema.parse(variables);
      if (parsed[0].lesson == lessonId && parsed[0].toStatus !== watched) {
        setWState(parsed[0].toStatus);
      }
    }
  }, [variables]);

  return wState;
};

export default useWatchedState;
