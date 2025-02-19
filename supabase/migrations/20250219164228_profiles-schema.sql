DROP TABLE IF EXISTS profiles;
TRUNCATE auth.users CASCADE;

CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    bio TEXT DEFAULT NULL,
    mode TEXT DEFAULT 'dark' NOT NULL,
    avatar_url TEXT DEFAULT NULL,

    PRIMARY KEY (id)
);