import { useState } from 'react'
import { Users, Star, Send } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/cards'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'

interface Skill {
  id: string
  nome: string
  categoria: string
  avaliacao?: number
  comentario?: string
  avaliado: boolean
}

const skillsIniciais: Skill[] = [
  { id: '1', nome: 'JavaScript', categoria: 'Técnica', avaliado: false },
  { id: '2', nome: 'Liderança', categoria: 'Comportamental', avaliado: false },
  {
    id: '3',
    nome: 'Comunicação',
    categoria: 'Comportamental',
    avaliado: false,
  },
  { id: '4', nome: 'React', categoria: 'Técnica', avaliado: false },
  {
    id: '5',
    nome: 'Trabalho em Equipe',
    categoria: 'Comportamental',
    avaliado: false,
  },
]

const colaboradores = [
  { id: '1', nome: 'João Silva' },
  { id: '2', nome: 'Ana Santos' },
  { id: '3', nome: 'Carlos Oliveira' },
  { id: '4', nome: 'Maria Costa' },
]

export default function AvaliacoesPage() {
  const [tipoAvaliacao, setTipoAvaliacao] = useState<string>('')
  const [colaboradorSelecionado, setColaboradorSelecionado] =
    useState<string>('')
  const [skills, setSkills] = useState<Skill[]>(skillsIniciais)

  const handleTipoAvaliacaoChange = (tipo: string) => {
    setTipoAvaliacao(tipo)
    setColaboradorSelecionado('')
    // Reset skills when changing evaluation type
    setSkills(
      skillsIniciais.map((skill) => ({
        ...skill,
        avaliacao: undefined,
        comentario: '',
        avaliado: false,
      }))
    )
  }

  const handleAvaliacaoChange = (skillId: string, nota: number) => {
    setSkills(
      skills.map((skill) =>
        skill.id === skillId
          ? { ...skill, avaliacao: nota, avaliado: true }
          : skill
      )
    )
  }

  const handleComentarioChange = (skillId: string, comentario: string) => {
    setSkills(
      skills.map((skill) =>
        skill.id === skillId ? { ...skill, comentario } : skill
      )
    )
  }

  const getProgressColor = (skill: Skill) => {
    if (skill.avaliado) return 'bg-green-500'
    return 'bg-gray-300'
  }

  const renderStars = (skillId: string, currentRating?: number) => {
    return (
      <div className='flex items-center gap-1'>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleAvaliacaoChange(skillId, star)}
            className='focus:outline-none'
          >
            <Star
              className={`h-6 w-6 ${
                currentRating && star <= currentRating
                  ? 'fill-orange-400 text-orange-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
        {currentRating && (
          <span className='ml-2 text-sm text-gray-600'>{currentRating}/5</span>
        )}
      </div>
    )
  }

  const showEvaluationForm =
    tipoAvaliacao && (tipoAvaliacao !== 'gestor' || colaboradorSelecionado)

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          Módulo de Avaliação
        </h1>
        <p className='text-gray-600'>
          Realize avaliações 360°, individuais ou por gestor
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Sidebar - Configuração e Progresso */}
        <div className='lg:col-span-1 space-y-6'>
          {/* Configuração da Avaliação */}
          <Card>
            <CardHeader>
              <CardTitle>Configuração da Avaliação</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Tipo de Avaliação
                </label>
                <Select
                  value={tipoAvaliacao}
                  onValueChange={handleTipoAvaliacaoChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione o tipo' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='autoavaliacao'>Autoavaliação</SelectItem>
                    <SelectItem value='gestor'>
                      {' '}
                      Avaliação por Gestor
                    </SelectItem>
                    <SelectItem value='360'>Avaliação 360°</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {tipoAvaliacao === 'gestor' && (
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Colaborador a ser Avaliado
                  </label>
                  <Select
                    value={colaboradorSelecionado}
                    onValueChange={setColaboradorSelecionado}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Selecione o colaborador' />
                    </SelectTrigger>
                    <SelectContent>
                      {colaboradores.map((colaborador) => (
                        <SelectItem key={colaborador.id} value={colaborador.id}>
                          {colaborador.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Progresso */}
          {showEvaluationForm && (
            <Card>
              <CardHeader>
                <CardTitle>Progresso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {skills.map((skill) => (
                    <div key={skill.id} className='flex items-center gap-3'>
                      <div
                        className={`w-3 h-3 rounded-full ${getProgressColor(
                          skill
                        )}`}
                      />
                      <span className='text-sm font-medium'>{skill.nome}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Área Principal - Avaliação */}
        <div className='lg:col-span-2'>
          {!showEvaluationForm ? (
            <Card className='h-96 flex items-center justify-center'>
              <CardContent className='text-center'>
                <Users className='h-16 w-16 text-gray-400 mx-auto mb-4' />
                <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                  Selecione o Tipo de Avaliação
                </h3>
                <p className='text-gray-500'>
                  Escolha o tipo de avaliação para começar
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Avaliação de Competências</CardTitle>
                <CardDescription>
                  Avalie cada competência de 1 a 5 estrelas e adicione
                  comentários opcionais
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-8'>
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className='border-b border-gray-200 pb-6 last:border-b-0'
                  >
                    <div className='mb-4'>
                      <h4 className='text-lg font-semibold text-gray-900 mb-1'>
                        {skill.nome}
                      </h4>
                      <Badge variant='secondary' className='text-xs'>
                        {skill.categoria}
                      </Badge>
                    </div>

                    <div className='mb-4'>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Avaliação (1-5 estrelas)
                      </label>
                      {renderStars(skill.id, skill.avaliacao)}
                      {!skill.avaliacao && (
                        <p className='text-sm text-gray-500 mt-1'>
                          Não avaliado
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Comentários (opcional)
                      </label>
                      <Textarea
                        placeholder='Adicione comentários sobre esta competência...'
                        value={skill.comentario || ''}
                        onChange={(e) =>
                          handleComentarioChange(skill.id, e.target.value)
                        }
                        rows={3}
                        className='resize-none'
                      />
                    </div>
                  </div>
                ))}

                <div className='pt-6'>
                  <Button
                    className='w-full bg-black hover:bg-gray-800 text-white'
                    size='lg'
                    disabled={!skills.some((skill) => skill.avaliado)}
                  >
                    <Send className='h-4 w-4 mr-2' />
                    Enviar Avaliação
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
