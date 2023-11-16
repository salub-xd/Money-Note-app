import React from 'react'

export default function page({ params }: any) {
  return (
    <div>
      user : {params.id}
    </div>
  )
}
