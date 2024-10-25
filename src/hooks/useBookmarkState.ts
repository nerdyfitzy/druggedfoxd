import { variablesSchema } from "@/constants/schema";
import { useMutationState } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const useBookmarkState = (bookmarked: boolean, lessonId: number) => {
  const [bmState, setBmState] = useState(bookmarked);
  const variables = useMutationState({
    filters: {
      mutationKey: ["changeBookmarked", `${lessonId}`],
      status: "pending",
    },
    select: (mutation) => mutation.state.variables,
  });
  useEffect(() => {
    if (variables.length > 0) {
      const parsed = variablesSchema.parse(variables);
      if (parsed[0].lesson == lessonId && parsed[0].toStatus !== bookmarked) {
        setBmState(parsed[0].toStatus);
      }
    }
  }, [variables, bookmarked, lessonId]);

  return bmState;
};

export default useBookmarkState;
