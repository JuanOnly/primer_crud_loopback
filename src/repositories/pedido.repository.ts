import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pedido, PedidoRelations, PersonalModel} from '../models';
import {PersonalModelRepository} from './person.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly person: BelongsToAccessor<PersonalModel, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonalModelRepository') protected personalModelRepositoryGetter: Getter<PersonalModelRepository>,
  ) {
    super(Pedido, dataSource);
    this.person = this.createBelongsToAccessorFor('person', personalModelRepositoryGetter,);
    this.registerInclusionResolver('person', this.person.inclusionResolver);
  }
}
