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
      className="w-full max-w-xs space-y-2"
    >
      {items.map(item => (
        <Reorder.Item
          key={item}
          value={item}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 cursor-grab active:cursor-grabbing shadow-sm active:shadow-md transition-shadow select-none"
          whileDrag={{ scale: 1.03 }}
        >
          <GripVertical size={16} className="text-slate-400 flex-shrink-0" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            {item}
          </span>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
