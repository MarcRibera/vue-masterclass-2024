import { supabase } from '@/lib/supabaseClient.ts'
import type { QueryData } from '@supabase/supabase-js'

// Tasks with Projects
export const tasksWithProjectsQuery = supabase.from('tasks').select(`
    *,
    projects(id, name, slug
    )
  `)
export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>

// Task detail
export const tasksQuery = (id: number) =>
  supabase
    .from('tasks')
    .select(
      `*,
    projects (
    id, 
    name, 
    status, 
    collaborators)`,
    )
    .eq('id', id)
    .single()
// add ReturnType! to create a type for the query with Paremeter -> (id)
export type Task = QueryData<ReturnType<typeof tasksQuery>>

// Projects
export const projectsQuery = supabase.from('projects').select('*')
export type Projects = QueryData<typeof projectsQuery>

// Project Detail
export const projectQuery = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `*,
     tasks (
    id,
    name,
    status,
    due_date
  )`,
    )
    .eq('slug', slug)
    .single()

export type Project = QueryData<ReturnType<typeof projectQuery>>
