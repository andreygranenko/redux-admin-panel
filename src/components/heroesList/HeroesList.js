import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {fetchHeroes} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import {createSelector} from "reselect";

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    const filteredHeroesSelector = createSelector(
      (state) => state.filters.activeFilter,
      (state) => state.heroes.heroes,
      (activeFilter, heroes) => {
        if (activeFilter === "all") {
          console.log('test');
          return heroes;
        } else {
          return heroes.filter(hero => hero.element === activeFilter);
        }
      }
    );

    const filteredHeroes = useSelector(filteredHeroesSelector);
    // const filteredHeroes = useSelector(state => {
    //     if (state.filters.activeFilter === "all") {
    //         return state.heroes.heroes;
    //     } else {
    //         return state.heroes.heroes.filter(hero => hero.element === state.filters.activeFilter);
    //     }
    // });
    const {heroesLoadingStatus} = useSelector(state => state.heroes);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
         dispatch(fetchHeroes(request));
        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem id={id} key={id} {...props}/>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;