import Home from '../src/components/Home'
import MemoryGame from './components/memoryGame';
import SignUp from './components/SignUp';
import Login from './components/Login';
import LeaderBoard from './components/LeaderBoard'
import RPSGame from './components/rps';
import Profile from './components/Profile';
import TicTacToe from './components/TicTacToe';
import Password from './components/Password';


interface RouteConfig{
    path : string;
    component : React.ComponentType;
    private? : boolean;
}

const routes:RouteConfig[] = [
    {
    path : '/Home/:name',
    component: Home,
    private : true
    },
    {
    path : '/memoryGame/:name' || '/memorygame/:name',
    component: MemoryGame,
    private : true
    },
    {
    path : '/signUp',
    component : SignUp,
    },
    {
    path : '/login',
    component : Login,
    },
    {
    path : '/leaderboard/:name',
    component : LeaderBoard,
    private : true
    },
    {
    path : '/',
    component : Home,
    private : true
    },
    {
    path : '/rps/:name',
    component : RPSGame,
    private : true
    },
    {
    path : '/profile/:name',
    component : Profile,
    private : true
    },
    {
    path : '/tictactoe/:name',
    component : TicTacToe,
    private : true
    },
    {
    path : '/password/:id',
    component : Password,
    private : true
    }
]


export default routes;

