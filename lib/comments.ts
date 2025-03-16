import { supabase, type Comment } from './supabase'

export async function getComments(blogId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('blog_id', blogId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching comments:', error)
    return []
  }

  return data
}

export async function addComment(comment: Omit<Comment, 'id' | 'created_at'>) {
  const { error } = await supabase
    .from('comments')
    .insert([comment])

  if (error) {
    console.error('Error adding comment:', error)
    throw error
  }
}

export async function deleteComment(commentId: string, userId: string) {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)
    .eq('user_id', userId)

  if (error) {
    console.error('Error deleting comment:', error)
    throw error
  }
}

export async function updateComment(commentId: string, userId: string, content: string) {
  const { error } = await supabase
    .from('comments')
    .update({ content })
    .eq('id', commentId)
    .eq('user_id', userId)

  if (error) {
    console.error('Error updating comment:', error)
    throw error
  }
} 