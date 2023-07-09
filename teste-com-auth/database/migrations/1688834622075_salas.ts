import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'salas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('numerosala').notNullable().unique()
      table.integer('capacidade').notNullable()
      table.boolean('disponibilidade').notNullable().defaultTo(true)
      table.integer('user_id').notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
