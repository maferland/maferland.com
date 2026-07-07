'use client'

import { useState } from 'react'
import { Reorder } from 'framer-motion'
import { GripVertical } from 'lucide-react'

const initialItems = [
  'Design tokens',
  'Motion curves',
  'Layout grids',
  'Color systems',
  'Typography scale',
]

export default function SpringReorder() {
  const [items, setItems] = useState(initialItems)

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={setItems}
      className="w-full max-w-[280px] space-y-2 p-1"
    >
      {items.map(item => (
        <Reorder.Item
          key={item}
          value={item}
          className="flex cursor-grab select-none items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-[var(--body)] shadow-sm transition-shadow active:cursor-grabbing active:shadow-md"
          whileDrag={{ scale: 1.03 }}
        >
          <GripVertical
            size={16}
            className="flex-shrink-0 text-[var(--faint)]"
          />
          <span className="text-sm font-medium">{item}</span>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
