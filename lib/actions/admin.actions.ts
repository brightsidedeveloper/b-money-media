'use server'

import { revalidatePath } from 'next/cache'
import User from '../models/user.model'
import { connectToDB } from '../mongoose'

export async function makeAdmin(username: string, admin: boolean) {
  try {
    connectToDB()
    await User.findOneAndUpdate({ username }, { admin }, { upsert: true })

    revalidatePath('/')
  } catch (err: any) {
    console.log(err.message)
  }
}

export async function crownUser(
  username: string,
  crown: boolean,
  path: string
) {
  connectToDB()

  try {
    await User.findOneAndUpdate(
      { username },
      { verified: crown },
      { upsert: true }
    )

    revalidatePath(path)
  } catch (err: any) {
    console.error(err)
  }
}

export async function promoteAbility(
  username: string,
  ability: string,
  add: boolean = false,
  path: string
) {
  connectToDB()

  try {
    const user = await User.findOne({ username })

    const abilities = user.abilities || []

    if (add && !abilities.includes(ability)) abilities.push(ability)
    else if (!add && abilities.includes(ability))
      abilities.splice(abilities.indexOf(ability), 1)
    else return

    await User.findOneAndUpdate({ username }, { abilities }, { upsert: true })

    revalidatePath(path)
  } catch (err: any) {
    console.error(err)
  }
}

export async function awardClown() {
  connectToDB()

  try {
    const users = await User.find()

    // Identify clown with most clowns
    let largestClownCount = 0
    let largestClownCountUser: any
    await Promise.all(
      users.map(async user => {
        const clownCount = user.clownCount || []

        if (clownCount.length > largestClownCount) {
          largestClownCount = clownCount.length
          largestClownCountUser = user
        }
      })
    )

    // Remove all clowns
    await Promise.all(
      users.map(async user => {
        const abilities = user.abilities || []
        abilities.splice(abilities.indexOf('clown'), 1)

        await User.findOneAndUpdate(
          { username: user.username },
          { $set: { clownCount: [], abilities } },
          { upsert: true }
        )
      })
    )

    if (!largestClownCountUser) return

    // Award clown
    await User.findOneAndUpdate(
      { username: largestClownCountUser.username },
      { $push: { abilities: 'clown' } },
      { upsert: true }
    )

    revalidatePath('/admin')
  } catch (err: any) {
    console.error(err)
  }
}
