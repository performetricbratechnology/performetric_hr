import { useState, useMemo } from 'react'
import { Trophy, Medal, Award, Users, TrendingUp, Star } from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from '@/components/ui/tabs'

interface Colaborador {
  id: string
  nome: string
  time: string
  score: number
  variacao: number
  posicao: number
  badges: string[]
  dataAvaliacao: Date
}

interface Time {
  id: string
  nome: string
  membros: number
  media: number
  variacao: number
  topPerformer: string
  posicao: number
  dataAvaliacao: Date
}

interface SkillRanking {
  skill: string
  colaboradores: Array<{
    nome: string
    time: string
    score: number
    posicao: number
    dataAvaliacao: Date
  }>
}

interface Conquista {
  id: string
  titulo: string
  descricao: string
  colaborador: string
  dataConquista: Date
  icone: React.ComponentType<{ className?: string }>
}

const getCurrentMonth = () => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1)
}

const getLastMonth = () => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() - 1, 1)
}

const getCurrentQuarter = () => {
  const now = new Date()
  const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3
  return new Date(now.getFullYear(), quarterStartMonth, 1)
}

const getCurrentYear = () => {
  const now = new Date()
  return new Date(now.getFullYear(), 0, 1)
}

const filterByPeriod = <T extends { dataAvaliacao: Date }>(
  items: T[],
  periodo: string
): T[] => {
  const now = new Date()
  let startDate: Date

  switch (periodo) {
    case 'atual':
      startDate = getCurrentMonth()
      break
    case 'passado':
      startDate = getLastMonth()
      return items.filter(
        (item) =>
          item.dataAvaliacao.getMonth() === startDate.getMonth() &&
          item.dataAvaliacao.getFullYear() === startDate.getFullYear()
      )
    case 'trimestre':
      startDate = getCurrentQuarter()
      break
    case 'ano':
      startDate = getCurrentYear()
      break
    default:
      return items
  }

  return items.filter(
    (item) => item.dataAvaliacao >= startDate && item.dataAvaliacao <= now
  )
}

// Gerador de dados mockados com datas reais
const generateMockData = () => {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  // Colaboradores com datas variadas
  const colaboradores: Colaborador[] = [
    // Mês atual
    {
      id: '1',
      nome: 'Maria Santos',
      time: 'UX',
      score: 4.8,
      variacao: 0.3,
      posicao: 1,
      badges: ['Top Performer', 'Innovation Leader'],
      dataAvaliacao: new Date(currentYear, currentMonth, 15),
    },
    {
      id: '2',
      nome: 'João Silva',
      time: 'Tech',
      score: 4.6,
      variacao: 0.2,
      posicao: 2,
      badges: ['Technical Expert', 'Team Player'],
      dataAvaliacao: new Date(currentYear, currentMonth, 10),
    },
    // Mês passado
    {
      id: '3',
      nome: 'Ana Costa',
      time: 'Marketing',
      score: 4.5,
      variacao: 0.4,
      posicao: 3,
      badges: ['Rising Star', 'Communication Pro'],
      dataAvaliacao: new Date(currentYear, currentMonth - 1, 20),
    },
    // 2 meses atrás (trimestre atual)
    {
      id: '4',
      nome: 'Pedro Lima',
      time: 'Tech',
      score: 4.3,
      variacao: 0.1,
      posicao: 4,
      badges: ['Consistent Performer'],
      dataAvaliacao: new Date(currentYear, currentMonth - 2, 5),
    },
    // 4 meses atrás (ano atual)
    {
      id: '5',
      nome: 'Carlos Santos',
      time: 'Sales',
      score: 4.2,
      variacao: 0.2,
      posicao: 5,
      badges: ['Client Champion'],
      dataAvaliacao: new Date(currentYear, currentMonth - 4, 15),
    },
  ]

  // Times com datas variadas
  const times: Time[] = [
    {
      id: '1',
      nome: 'UX',
      membros: 8,
      media: 4.5,
      variacao: 0.3,
      topPerformer: 'Maria Santos',
      posicao: 1,
      dataAvaliacao: new Date(currentYear, currentMonth, 10),
    },
    {
      id: '2',
      nome: 'Tech',
      membros: 15,
      media: 4.3,
      variacao: 0.2,
      topPerformer: 'João Silva',
      posicao: 2,
      dataAvaliacao: new Date(currentYear, currentMonth - 1, 15),
    },
    {
      id: '3',
      nome: 'Marketing',
      membros: 12,
      media: 4.1,
      variacao: 0.4,
      topPerformer: 'Ana Costa',
      posicao: 3,
      dataAvaliacao: new Date(currentYear, currentMonth - 2, 20),
    },
    {
      id: '4',
      nome: 'Sales',
      membros: 10,
      media: 3.9,
      variacao: 0.1,
      topPerformer: 'Carlos Santos',
      posicao: 4,
      dataAvaliacao: new Date(currentYear, currentMonth - 3, 5),
    },
  ]

  // Skills com datas variadas
  const skills: SkillRanking[] = [
    {
      skill: 'JavaScript',
      colaboradores: [
        {
          nome: 'João Silva',
          time: 'Tech',
          score: 4.9,
          posicao: 1,
          dataAvaliacao: new Date(currentYear, currentMonth, 5),
        },
        {
          nome: 'Pedro Lima',
          time: 'Tech',
          score: 4.7,
          posicao: 2,
          dataAvaliacao: new Date(currentYear, currentMonth - 1, 20),
        },
        {
          nome: 'Ana Costa',
          time: 'Marketing',
          score: 4.2,
          posicao: 3,
          dataAvaliacao: new Date(currentYear, currentMonth - 2, 10),
        },
      ],
    },
    {
      skill: 'Liderança',
      colaboradores: [
        {
          nome: 'Maria Santos',
          time: 'UX',
          score: 4.8,
          posicao: 1,
          dataAvaliacao: new Date(currentYear, currentMonth, 15),
        },
        {
          nome: 'Carlos Santos',
          time: 'Sales',
          score: 4.5,
          posicao: 2,
          dataAvaliacao: new Date(currentYear, currentMonth - 1, 25),
        },
        {
          nome: 'João Silva',
          time: 'Tech',
          score: 4.1,
          posicao: 3,
          dataAvaliacao: new Date(currentYear, currentMonth - 3, 5),
        },
      ],
    },
  ]

  // Conquistas com datas variadas
  const conquistas: Conquista[] = [
    {
      id: '1',
      titulo: 'Maior Evolução do Mês',
      descricao: 'Crescimento de 0.4 pontos na avaliação geral',
      colaborador: 'Ana Costa',
      dataConquista: new Date(currentYear, currentMonth - 1, 25),
      icone: TrendingUp,
    },
    {
      id: '2',
      titulo: 'Melhor Avaliação 360°',
      descricao: 'Nota 4.8 na avaliação completa',
      colaborador: 'Maria Santos',
      dataConquista: new Date(currentYear, currentMonth, 10),
      icone: Star,
    },
    {
      id: '3',
      titulo: 'Líder em Colaboração',
      descricao: 'Maior pontuação em trabalho em equipe',
      colaborador: 'João Silva',
      dataConquista: new Date(currentYear, currentMonth - 2, 15),
      icone: Users,
    },
  ]

  return { colaboradores, times, skills, conquistas }
}

export default function RankingsPage() {
  const [periodo, setPeriodo] = useState('atual')
  const [timeFilter, setTimeFilter] = useState('todos')
  const [activeTab, setActiveTab] = useState('geral')

  const dados = useMemo(() => generateMockData(), [])

  const dadosFiltrados = useMemo(() => {
  
    const colaboradoresFiltrados = filterByPeriod(dados.colaboradores, periodo)
      .filter(
        (c) => timeFilter === 'todos' || c.time.toLowerCase() === timeFilter
      )
      .sort((a, b) => b.score - a.score)
      .map((c, i) => ({ ...c, posicao: i + 1 }))

    const timesFiltrados = dados.times
      .filter((t) => {

        if (timeFilter === 'todos') return true
        return dados.colaboradores.some(
          (c) =>
            c.time.toLowerCase() === timeFilter &&
            c.time.toLowerCase() === t.nome.toLowerCase()
        )
      })
      .sort((a, b) => b.media - a.media)
      .map((t, i) => ({ ...t, posicao: i + 1 }))

    const skillsFiltradas = dados.skills
      .map((skill) => ({
        ...skill,
        colaboradores: filterByPeriod(
          skill.colaboradores.map((c) => ({
            ...c,
            dataAvaliacao: c.dataAvaliacao,
          })),
          periodo
        )
          .filter(
            (c) => timeFilter === 'todos' || c.time.toLowerCase() === timeFilter
          )
          .sort((a, b) => b.score - a.score)
          .map((c, i) => ({ ...c, posicao: i + 1 }))
          .slice(0, 3), // Top 3
      }))
      .filter((skill) => skill.colaboradores.length > 0)

    const conquistasFiltradas = filterByPeriod(
      dados.conquistas.map((c) => ({ ...c, dataAvaliacao: c.dataConquista })),
      periodo
    )

    return {
      colaboradores: colaboradoresFiltrados,
      times: timesFiltrados,
      skills: skillsFiltradas,
      conquistas: conquistasFiltradas,
    }
  }, [dados, periodo, timeFilter])

  const getPosicaoIcon = (posicao: number) => {
    switch (posicao) {
      case 1:
        return <Trophy className='h-5 w-5 text-yellow-500' />
      case 2:
        return <Medal className='h-5 w-5 text-gray-400' />
      case 3:
        return <Award className='h-5 w-5 text-orange-600' />
      default:
        return (
          <div className='w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium'>
            {posicao}
          </div>
        )
    }
  }

  const getBadgeColor = (badge: string) => {
    const colors: Record<string, string> = {
      'Top Performer': 'bg-yellow-100 text-yellow-800',
      'Innovation Leader': 'bg-purple-100 text-purple-800',
      'Technical Expert': 'bg-blue-100 text-blue-800',
      'Team Player': 'bg-green-100 text-green-800',
      'Rising Star': 'bg-pink-100 text-pink-800',
      'Communication Pro': 'bg-indigo-100 text-indigo-800',
      'Consistent Performer': 'bg-gray-100 text-gray-800',
      'Client Champion': 'bg-red-100 text-red-800',
      Especialista: 'bg-orange-100 text-orange-800',
    }
    return colors[badge] || 'bg-gray-100 text-gray-800'
  }

  const getVariacaoColor = (variacao: number) => {
    return variacao > 0
      ? 'text-green-600'
      : variacao < 0
      ? 'text-red-600'
      : 'text-gray-600'
  }

  const getPeriodoLabel = (periodo: string) => {
    const labels: Record<string, string> = {
      atual: 'Período Atual (Mês)',
      passado: 'Mês Passado',
      trimestre: 'Trimestre',
      ano: 'Ano',
    }
    return labels[periodo] || periodo
  }

  const getTimeLabel = (time: string) => {
    const labels: Record<string, string> = {
      todos: 'Todos os Times',
      tech: 'Tech',
      ux: 'UX',
      marketing: 'Marketing',
      sales: 'Sales',
    }
    return labels[time] || time
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          Rankings e Reconhecimentos
        </h1>
        <p className='text-gray-600'>
          Acompanhe os melhores desempenhos e conquistas da equipe.
        </p>
      </div>

      <div className='flex gap-4 mb-8'>
        <Select value={periodo} onValueChange={setPeriodo}>
          <SelectTrigger className='w-48'>
            <SelectValue placeholder='Selecione o período' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='atual'>Período Atual </SelectItem>
            <SelectItem value='passado'>Mês Passado</SelectItem>
            <SelectItem value='trimestre'>Trimestre</SelectItem>
            <SelectItem value='ano'>Ano</SelectItem>
          </SelectContent>
        </Select>

        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className='w-48'>
            <SelectValue placeholder='Selecione o time' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='todos'>Todos os Times</SelectItem>
            <SelectItem value='tech'>Tech</SelectItem>
            <SelectItem value='ux'>UX</SelectItem>
            <SelectItem value='marketing'>Marketing</SelectItem>
            <SelectItem value='sales'>Sales</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {(periodo !== 'atual' || timeFilter !== 'todos') && (
        <div className='mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200'>
          <p className='text-sm text-blue-800'>
            <strong>Filtros ativos:</strong> {getPeriodoLabel(periodo)}
            {timeFilter !== 'todos' && ` • ${getTimeLabel(timeFilter)}`}
            {dadosFiltrados.colaboradores.length === 0 && (
              <span className='ml-2 text-red-600'>
                • Nenhum resultado encontrado
              </span>
            )}
          </p>
        </div>
      )}

      <TabsRoot
        value={activeTab}
        onValueChange={setActiveTab}
        className='space-y-6'
      >
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='geral'>Ranking Geral</TabsTrigger>
          <TabsTrigger value='competencia'>Por Competência</TabsTrigger>
          <TabsTrigger value='times'>Times</TabsTrigger>
          <TabsTrigger value='conquistas'>Conquistas</TabsTrigger>
        </TabsList>

        <TabsContent value='geral'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Trophy className='h-5 w-5' />
                Ranking Geral de Performance
              </CardTitle>
              <CardDescription>
                Classificação baseada na média de todas as competências
                {timeFilter !== 'todos' &&
                  ` • Filtrado por: ${getTimeLabel(timeFilter)}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {dadosFiltrados.colaboradores.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                  <Trophy className='h-12 w-12 mx-auto mb-4 text-gray-300' />
                  <p>
                    Nenhum colaborador encontrado para os filtros selecionados.
                  </p>
                </div>
              ) : (
                <div className='space-y-4'>
                  {dadosFiltrados.colaboradores.map((colaborador) => (
                    <div
                      key={`${colaborador.id}-${colaborador.dataAvaliacao}`}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        colaborador.posicao === 1
                          ? 'bg-yellow-50 border-yellow-200'
                          : 'bg-white'
                      }`}
                    >
                      <div className='flex items-center gap-4'>
                        {getPosicaoIcon(colaborador.posicao)}
                        <div>
                          <h3 className='font-semibold text-gray-900'>
                            {colaborador.nome}
                          </h3>
                          <p className='text-sm text-gray-600'>
                            {colaborador.time} • Score: {colaborador.score}/5
                            <span
                              className={`ml-1 ${getVariacaoColor(
                                colaborador.variacao
                              )}`}
                            >
                              {colaborador.variacao > 0 ? '+' : ''}
                              {colaborador.variacao}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='flex gap-1'>
                          {colaborador.badges.map((badge) => (
                            <Badge key={badge} className={getBadgeColor(badge)}>
                              {badge}
                            </Badge>
                          ))}
                        </div>
                        <Button variant='outline' size='sm'>
                          Ver Perfil
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='competencia'>
          <div className='space-y-6'>
            {dadosFiltrados.skills.length === 0 ? (
              <Card>
                <CardContent className='text-center py-8 text-gray-500'>
                  <Award className='h-12 w-12 mx-auto mb-4 text-gray-300' />
                  <p>
                    Nenhuma competência encontrada para os filtros selecionados.
                  </p>
                </CardContent>
              </Card>
            ) : (
              dadosFiltrados.skills.map((ranking) => (
                <Card key={`${ranking.skill}-${periodo}-${timeFilter}`}>
                  <CardHeader>
                    <CardTitle>Ranking - {ranking.skill}</CardTitle>
                    <CardDescription>
                      Top performers nesta competência
                      {timeFilter !== 'todos' &&
                        ` • Filtrado por: ${getTimeLabel(timeFilter)}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      {ranking.colaboradores.map((colaborador) => (
                        <div
                          key={`${ranking.skill}-${colaborador.nome}-${periodo}`}
                          className='flex items-center justify-between p-3 rounded-lg bg-gray-50'
                        >
                          <div className='flex items-center gap-3'>
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                                colaborador.posicao === 1
                                  ? 'bg-orange-500'
                                  : colaborador.posicao === 2
                                  ? 'bg-gray-400'
                                  : 'bg-red-500'
                              }`}
                            >
                              {colaborador.posicao}
                            </div>
                            <div>
                              <p className='font-medium'>{colaborador.nome}</p>
                              <p className='text-sm text-gray-600'>
                                {colaborador.time}
                              </p>
                            </div>
                          </div>
                          <div className='flex items-center gap-2'>
                            <span className='font-bold'>
                              {colaborador.score}/5
                            </span>
                            {colaborador.posicao === 1 && (
                              <Badge className='bg-orange-100 text-orange-800'>
                                Especialista
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value='times'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Users className='h-5 w-5' />
                Ranking de Times
              </CardTitle>
              <CardDescription>Performance média por equipe</CardDescription>
            </CardHeader>
            <CardContent>
              {dadosFiltrados.times.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                  <Users className='h-12 w-12 mx-auto mb-4 text-gray-300' />
                  <p>Nenhum time encontrado para o período selecionado.</p>
                </div>
              ) : (
                <div className='space-y-4'>
                  {dadosFiltrados.times.map((time) => (
                    <div
                      key={`${time.id}-${time.dataAvaliacao}`}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        time.posicao === 1
                          ? 'bg-yellow-50 border-yellow-200'
                          : 'bg-white'
                      }`}
                    >
                      <div className='flex items-center gap-4'>
                        {getPosicaoIcon(time.posicao)}
                        <div>
                          <h3 className='font-semibold text-gray-900'>
                            {time.nome}
                          </h3>
                          <p className='text-sm text-gray-600'>
                            {time.membros} membros • Média: {time.media}/5
                            <span
                              className={`ml-1 ${getVariacaoColor(
                                time.variacao
                              )}`}
                            >
                              {time.variacao > 0 ? '+' : ''}
                              {time.variacao}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className='text-right'>
                        <p className='text-sm text-gray-600'>
                          Top: {time.topPerformer}
                        </p>
                        <Button variant='outline' size='sm'>
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='conquistas'>
          <div className='space-y-8'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Award className='h-5 w-5' />
                  Conquistas e Reconhecimentos
                </CardTitle>
                <CardDescription>
                  Destaques e premiações do período
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {dadosFiltrados.conquistas.map((conquista) => (
                    <div
                      key={conquista.id}
                      className='flex items-center gap-4 p-4 bg-blue-50 rounded-lg'
                    >
                      <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                        <conquista.icone className='h-6 w-6 text-blue-600' />
                      </div>
                      <div className='flex-1'>
                        <h4 className='font-semibold text-gray-900'>
                          {conquista.titulo}
                        </h4>
                        <p className='text-sm text-gray-600'>
                          {conquista.descricao}
                        </p>
                        <p className='text-sm font-medium text-blue-600'>
                          {conquista.colaborador} •{' '}
                          {conquista.dataConquista.toLocaleDateString('pt-BR', {
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div>
              <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                Hall da Fama
              </h2>
              <p className='text-gray-600 mb-6'>Recordes e marcos históricos</p>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <Card className='bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200'>
                  <CardContent className='p-6 text-center'>
                    <Trophy className='h-12 w-12 text-orange-500 mx-auto mb-4' />
                    <h3 className='font-semibold text-gray-900 mb-2'>
                      Maior Score
                    </h3>
                    <p className='text-3xl font-bold text-orange-600 mb-1'>
                      4.9
                    </p>
                    <p className='text-sm text-gray-600'>Maria Santos - 2024</p>
                  </CardContent>
                </Card>

                <Card className='bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'>
                  <CardContent className='p-6 text-center'>
                    <TrendingUp className='h-12 w-12 text-green-500 mx-auto mb-4' />
                    <h3 className='font-semibold text-gray-900 mb-2'>
                      Maior Evolução
                    </h3>
                    <p className='text-3xl font-bold text-green-600 mb-1'>
                      +1.2
                    </p>
                    <p className='text-sm text-gray-600'>Ana Costa - 2024</p>
                  </CardContent>
                </Card>

                <Card className='bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'>
                  <CardContent className='p-6 text-center'>
                    <Users className='h-12 w-12 text-blue-500 mx-auto mb-4' />
                    <h3 className='font-semibold text-gray-900 mb-2'>
                      Melhor Time
                    </h3>
                    <p className='text-3xl font-bold text-blue-600 mb-1'>4.7</p>
                    <p className='text-sm text-gray-600'>UX Team - Q3 2024</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
      </TabsRoot>
    </div>
  )
}
