import { logLessonAsViewed } from "@/app/actions/watch"
import { useMutation } from "@tanstack/react-query"

const useMarkAsViewedMutation = () => {
    return useMutation({
        mutationKey: ['logLesson'],
        mutationFn: (lessonId: number) => {
            return logLessonAsViewed(lessonId)
        }
    })
}


export default useMarkAsViewedMutation 
