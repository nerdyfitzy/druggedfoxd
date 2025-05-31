import { z } from "zod";

export const charOptions = [
    { value: "Fox", label: "Fox" },
    { value: "Falco", label: "Falco" },
    { value: "Marth", label: "Marth" },
    { value: "Sheik", label: "Sheik" },
    { value: "Puff", label: "Jigglypuff" },
    { value: "CFalcon", label: "Cpt. Falcon" },
    { value: "Peach", label: "Peach" },
    { value: "Icies", label: "Ice Climbers" },
    { value: "Pikachu", label: "Pikachu" },
    { value: "Luigi", label: "Luigi" },
    { value: "Doc", label: "Dr. Mario" },
    { value: "YL", label: "Young Link" },
    { value: "Samus", label: "Samus" },
    { value: "Donkey Kong", label: "Donkey Kong" },
    { value: "Link", label: "Link" },
    { value: "Bowser", label: "Bowser" },
    { value: "Ganondorf", label: "Ganondorf" },
    { value: "GnW", label: "Game & Watch" },
    { value: "Yoshi", label: "Yoshi" },
];

export const notesOptions = [
    { value: "Theory", label: "Theory" },
    { value: "Mentality", label: "Mentality" },
    { value: "Edgeguarding", label: "Edgeguarding" },
    { value: "Teams", label: "Teams" },
    { value: "Public", label: "Public" }
];

const lessonSchema = z.object({
    id: z.number(),
    player: z.string(),
    character: z.string(),
    opponent: z.string(),
    notes: z.nullable(z.string()),
    link: z.string(),
    timestamped: z.boolean(),
    date: z.string(),
});

export const lessonReferenceResponseSchema = z.object({
    data: z.object({
        data: z.array(
            z.object({
                Lessons: lessonSchema,
            })
        ),
    }),
});

export const lessonReferenceIdOnly = z.object({
    data: z.object({
        data: z.array(z.number()),
    }),
});

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const emailPWForm = z
    .object({
        email: z.string().email({ message: "Must be a valid email." }),
        password: z
            .string()
            .min(1, { message: "Required field" })
            .regex(passwordValidation, {
                message:
                    "Password must be at least 8 characters, have one uppercase, one lowercase, one number, and one special character.",
            }),

        confirmPassword: z
            .string()
            .min(1, { message: "Required field" })
            .regex(passwordValidation, {
                message:
                    "Password must be at least 8 characters, have one uppercase, one lowercase, one number, and one special character.",
            }),
    })
    .refine((obj) => obj.password === obj.confirmPassword, {
        message: "Passwords must match.",
    });

export const checkStatusSchema = z.object({
    data: z.object({
        check: z.boolean(),
    }),
});

export const allPostsResponseSchema = z.object({
    data: z.object({
        data: z.array(lessonSchema),

        count: z.number(),
        totalPages: z.number(),
    }),
});

export const emailLoginSchema = z.object({
    email: z.string().email({ message: "Must be a valid email address." }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/, {
            message:
                "Password must have one uppercase, one lowercase, and one number.",
        }),
});

export const emailSignUpSchema = z
    .object({
        email: z.string().email({ message: "Must be a valid email address." }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long." })
            .regex(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/, {
                message:
                    "Password must have one uppercase, one lowercase, and one number.",
            }),
        confirmPassword: z.string(),
    })
    .refine(({ confirmPassword, password }) => confirmPassword === password, {
        message: "Passwords must match.",
    });

export const variablesSchema = z.array(
    z.object({ lesson: z.number(), toStatus: z.boolean() })
);

//   CFalcon,
//   Doc,
//   "Donkey Kong": DonkeyKong,
//   Falco,
//   Fox,
//   Ganondorf,
//   Icies,
//   Link,
//   Luigi,
//   Marth,
//   Peach,
//   Pikachu,
//   Puff,
//   Samus,
//   YL,
//   Sheik,
//   GnW,
