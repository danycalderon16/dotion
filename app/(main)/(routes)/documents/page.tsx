"use client"
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const DocumentsPage = () => {
  const {user} = useUser();
  const router = useRouter();
  const create = useMutation(api.docuements.create);

  const onCreate = () => {
    const promise = create({
      title:"Untitled"
    }).then((docuemntId) => router.push(`/documents/${docuemntId}`));

    toast.promise(promise,{
      loading:"Creating...",
      success:"New note created!",
      error:"Failed to create a new note."
    })
  }

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image
        src='/empty.png'
        height={300}
        width={300}
        alt='empty'
        className='dark:hidden'
      />
      <Image
        src='/empty.png'
        height={300}
        width={300}
        alt='empty'
        className='hidden dark:block'
      />
      <h2 className='text-lg font-medium'>
        Welcome to {user?.firstName}&apos;s Doniton
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className='mr-2 h-4 w-4' />
        Create a note
      </Button>
    </div>
  )
}

export default DocumentsPage