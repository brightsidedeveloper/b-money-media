'use client'

import { Button } from '@/components/ui/button'
import { awardClown } from '@/lib/actions/admin.actions'

export default function AwardClown() {
  return <Button onClick={awardClown}>Award Clown</Button>
}
