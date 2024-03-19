import { PrismaClient } from '@prisma/client'
//@ts-ignore
import { users } from './constants/user'

const prisma = new PrismaClient()

async function main() {

  const usersSeed = users.map((user) => {
    return prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        password: user.password,
        email: user.email,
        employee: {
            create: {
                registration: user.registration,
                address: user.address,
                cpf: user.cpf,
                job_role: user.job_role,
                pib: user.pib,
                telphone: user.telphone,
                celphone: user.celphone,
                name: user.name,
            }
        }
      }
    })
  })

  await prisma.$transaction(usersSeed)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
