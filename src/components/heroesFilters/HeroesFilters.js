
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import {useDispatch, useSelector} from "react-redux";
import {changeFilter} from "../../actions";

const HeroesFilters = () => {
    const activeFilter = useSelector(state => state.filters.activeFilter);
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters.filters);
    if (filters.length === 0) {
        return <h5 className="text-center mt-5">Фильтров пока нет</h5>
    }
    const renderFilters = (arr) => {
        return arr.map((item, index) => {
            return <button
              key={index}
              className={`${item.className} ${activeFilter === item.value ? 'active' : null}`}
              onClick={() => dispatch(changeFilter(item.value))}>
                {item.name}
            </button>
        })
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
{/*                    <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button>*/}
                    {renderFilters(filters)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;